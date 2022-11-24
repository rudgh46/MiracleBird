package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengerRepository extends JpaRepository<Challenger,Long> {
    Challenger findTop1ByChallengeAndUser(Challenge challengeIdx, User userIdx);
}
