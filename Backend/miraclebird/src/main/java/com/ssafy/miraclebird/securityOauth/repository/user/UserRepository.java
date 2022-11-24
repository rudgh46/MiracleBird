package com.ssafy.miraclebird.securityOauth.repository.user;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
    
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
