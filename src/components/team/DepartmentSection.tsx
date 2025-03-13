
import React from 'react';
import { TeamMember } from './TeamMemberCard';
import TeamMemberCard from './TeamMemberCard';

interface DepartmentSectionProps {
  title: string;
  members: TeamMember[];
  columnLayout?: 'single' | 'triple' | 'double';
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({ 
  title, 
  members,
  columnLayout = 'triple'
}) => {
  const getGridClassName = () => {
    switch (columnLayout) {
      case 'single':
        return 'grid grid-cols-1 gap-4';
      case 'double':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
      case 'triple':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold text-brio-navy mb-4">{title}</h3>
      <div className={getGridClassName()}>
        {members.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default DepartmentSection;
