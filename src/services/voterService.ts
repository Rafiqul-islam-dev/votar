import { Voter, SearchCriteria } from '../types';
import voterData from '../data/voters.json';

export class VoterService {
  private static voters: Voter[] = voterData as Voter[];

  static search(criteria: SearchCriteria): Promise<Voter[]> {
    return new Promise((resolve) => {
      // Simulate network delay for a more "premium" feel (loading state)
      setTimeout(() => {
        const results = this.voters.filter((voter) => {
          const matchName = !criteria.name || 
            voter.name.toLowerCase().includes(criteria.name.toLowerCase().trim());
          
          const matchFather = !criteria.father_name || 
            voter.father_name.toLowerCase().includes(criteria.father_name.toLowerCase().trim());
          
          const matchMother = !criteria.mother_name || 
            voter.mother_name.toLowerCase().includes(criteria.mother_name.toLowerCase().trim());
          
          const matchDOB = !criteria.date_of_birth || 
            voter.date_of_birth === criteria.date_of_birth.trim();

          return matchName && matchFather && matchMother && matchDOB;
        });

        resolve(results);
      }, 600);
    });
  }

  static getAll(): Voter[] {
    return this.voters;
  }
}
