import { AppDataSource } from "../config/data-source";
import { Role } from "../entity/Roles";

export const createDefaultRoles = async () => {
    const roleRepo = AppDataSource.getRepository(Role);
  
    const defaultRoles = [
      { roleName: "ADMIN", position: 1 },
      { roleName: "RECRUITER", position: 2 },
      { roleName: "JOB_SEEKER", position: 3 }
    ];
  
    for (const roleData of defaultRoles) {
      const exists = await roleRepo.findOneBy({ roleName: roleData.roleName });
      if (!exists) {
        const newRole = roleRepo.create(roleData);
        await roleRepo.save(newRole);
        console.log(`Role '${roleData.roleName}' created`);
      }
    }
  };