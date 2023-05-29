package com.projects.University.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>{

}
