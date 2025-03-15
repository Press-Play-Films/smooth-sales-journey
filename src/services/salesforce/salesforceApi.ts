
/**
 * Salesforce API Integration Service
 * Handles authentication and data exchange with Salesforce CRM
 */

// Configuration for Salesforce API connection
interface SalesforceConfig {
  clientId: string;
  loginUrl: string;
  redirectUri: string;
  apiVersion: string;
}

// Default configuration - would be replaced with actual values in production
const defaultConfig: SalesforceConfig = {
  clientId: "YOUR_CLIENT_ID", // Replace with actual client ID in production
  loginUrl: "https://login.salesforce.com",
  redirectUri: `${window.location.origin}/auth/callback`,
  apiVersion: "v56.0",
};

// Authentication state
let authToken: string | null = null;
let instanceUrl: string | null = null;

/**
 * Initialize Salesforce connection from localStorage if available
 */
const initFromStorage = (): boolean => {
  try {
    const storedAuth = localStorage.getItem('sf_auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      authToken = auth.token;
      instanceUrl = auth.instanceUrl;
      return true;
    }
  } catch (error) {
    console.error("Failed to restore Salesforce auth:", error);
  }
  return false;
};

// Initialize on module load
initFromStorage();

/**
 * Check if user is authenticated with Salesforce
 */
export const isAuthenticated = (): boolean => {
  return !!authToken && !!instanceUrl;
};

/**
 * Initiate OAuth flow with Salesforce
 */
export const initiateLogin = (config: Partial<SalesforceConfig> = {}): void => {
  const finalConfig = { ...defaultConfig, ...config };
  const authUrl = new URL(`${finalConfig.loginUrl}/services/oauth2/authorize`);
  
  authUrl.searchParams.append('client_id', finalConfig.clientId);
  authUrl.searchParams.append('redirect_uri', finalConfig.redirectUri);
  authUrl.searchParams.append('response_type', 'token');
  
  window.location.href = authUrl.toString();
};

/**
 * Handle OAuth callback and extract token
 */
export const handleAuthCallback = (): boolean => {
  if (!window.location.hash) return false;
  
  const params = new URLSearchParams(window.location.hash.substring(1));
  const token = params.get('access_token');
  const url = params.get('instance_url');
  
  if (token && url) {
    authToken = token;
    instanceUrl = url;
    
    // Store in localStorage
    localStorage.setItem('sf_auth', JSON.stringify({
      token,
      instanceUrl: url,
    }));
    
    return true;
  }
  
  return false;
};

/**
 * Log out from Salesforce
 */
export const logout = (): void => {
  localStorage.removeItem('sf_auth');
  authToken = null;
  instanceUrl = null;
};

/**
 * Make a request to Salesforce API
 */
export const apiRequest = async (
  endpoint: string, 
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  data?: any
): Promise<any> => {
  if (!isAuthenticated()) {
    throw new Error('Not authenticated with Salesforce');
  }
  
  const url = `${instanceUrl}/services/data/${defaultConfig.apiVersion}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Salesforce API error: ${error[0]?.message || 'Unknown error'}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Salesforce API request failed:', error);
    throw error;
  }
};

/**
 * Fetch client data from Salesforce
 */
export const fetchSalesforceClients = async (): Promise<any[]> => {
  try {
    const result = await apiRequest('/query/?q=SELECT+Id,Name,Email,Phone+FROM+Contact+LIMIT+10');
    return result.records || [];
  } catch (error) {
    console.error('Failed to fetch clients from Salesforce:', error);
    return [];
  }
};

/**
 * Sync local client data to Salesforce
 */
export const syncClientToSalesforce = async (client: any): Promise<boolean> => {
  try {
    // Check if client exists in Salesforce by email
    const query = `/query/?q=SELECT+Id+FROM+Contact+WHERE+Email='${encodeURIComponent(client.email)}'`;
    const result = await apiRequest(query);
    
    if (result.records && result.records.length > 0) {
      // Update existing contact
      const contactId = result.records[0].Id;
      await apiRequest(`/sobjects/Contact/${contactId}`, 'PATCH', {
        LastName: client.names.split(' ').pop(),
        FirstName: client.names.split(' ')[0],
        Phone: client.phone,
      });
    } else {
      // Create new contact
      const names = client.names.split(' ');
      await apiRequest('/sobjects/Contact', 'POST', {
        LastName: names.pop() || client.names,
        FirstName: names.join(' '),
        Email: client.email,
        Phone: client.phone,
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to sync client to Salesforce:', error);
    return false;
  }
};
