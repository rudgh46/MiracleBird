package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VerificationRepository extends JpaRepository<Verification,Long> {
//    Optional<Verification> findBy
    List<Verification> findByUserAndRegtimeBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    List<Verification> findByUser(User user);

    @Query(value = "SELECT u.name FROM (select  v.user_idx, COUNT(vl.verification_like_idx) as likes FROM verification v left outer join verification_like vl on v.verification_idx = vl.verification_idx WHERE v.approval != 2 GROUP BY v.verification_idx) a join user u on a.user_idx = u.user_idx GROUP BY a.user_idx ORDER BY count(a.user_idx) DESC, SUM(likes) DESC limit 3;", nativeQuery = true)    //예전거 @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)
    List<String> getRankByCount();

    @Query(value = "SELECT u.name\n" +
            "FROM (SELECT user_idx, MIN(b.regdate) from_dt, MAX(b.regdate) to_dt\n" +
            ", DATEDIFF(MAX(b.regdate), MIN(b.regdate)) + 1  as streak\n" +
            ", DATE(NOW()) as nowdate, SUM(b.likes) as likesum\n" +
            "FROM(SELECT @ROWNUM \\:= @ROWNUM+1,  a.user_idx, a.regdate, DATE_ADD(a.regdate, INTERVAL @ROWNUM DAY) as dateadd, a.likes\n" +
            "FROM (SELECT v.verification_idx, v.user_idx\n" +
            ", DATE(regtime) AS regdate, approval, COUNT(vl.verification_like_idx) as likes\n" +
            "FROM verification v left outer join verification_like vl on v.verification_idx = vl.verification_idx\n" +
            "WHERE v.approval != 2\n" +
            "GROUP BY user_idx, regdate\n" +
            "ORDER BY user_idx, regdate DESC) a) b\n" +
            "GROUP BY b.user_idx, dateadd ORDER BY b.user_idx, from_dt) c join user u on c.user_idx = u.user_idx\n" +
            "WHERE c.to_dt = c.nowdate or c.to_dt = c.nowdate-1 ORDER BY c.streak DESC, c.likesum DESC LIMIT 3;", nativeQuery = true)
    List<String> getRankByStreak();

    @Query(value = "SELECT streak\n" +
            "FROM(SELECT user_idx, MIN(b.regdate) from_dt, MAX(b.regdate) to_dt\n" +
            "\t\t\t, DATEDIFF(MAX(b.regdate), MIN(b.regdate)) + 1  as streak\n" +
            "\t\t\t, DATE(NOW()) as nowdate \n" +
            "\tFROM(SELECT @ROWNUM \\:= @ROWNUM+1,  a.user_idx, a.regdate, DATE_ADD(a.regdate, INTERVAL @ROWNUM DAY) as dateadd\n" +
            "\t\tFROM (SELECT v.verification_idx, v.user_idx\n" +
            "\t\t\t\t, DATE(regtime) AS regdate, approval \n" +
            "\t\t\t\tFROM verification v WHERE v.approval != 2 AND v.user_idx = ?1\n" +
            "\t\t\t\tGROUP BY regdate\n" +
            "\t\t\t\tORDER BY user_idx, regdate DESC) a) b\n" +
            "\tGROUP BY b.user_idx, dateadd ORDER BY b.user_idx, from_dt) c\n" +
            "WHERE c.to_dt = c.nowdate or c.to_dt = c.nowdate-1 ORDER BY streak DESC;", nativeQuery = true)
    List<Long> getStreakByUserIdx(Long userIdx);

    @Query(value = "SELECT " +
            "concat(a.name, a.image_path) " +
            "FROM (select mn.mynft_idx, mn.landmark_idx, mn.wallet_idx, lm.star_force, u.name, lm.image_path from mynft mn, landmark lm, wallet w, user u where mn.wallet_idx != 1 and mn.landmark_idx = lm.landmark_idx and mn.wallet_idx = w.wallet_idx and w.user_idx = u.user_idx) a left outer join price p on a.landmark_idx = p.landmark_idx GROUP BY a.landmark_idx ORDER BY a.star_force DESC, MAX(p.sell_price) DESC;", nativeQuery = true)
    List<String> getNftOwner();

    @Query(value = "SELECT @ROWNUM \\:= 0;", nativeQuery = true)
    void rownuminit();

    List<Verification> findByUserAndChallengeAndApprovalAndRegtimeAfter(User user, Challenge challenge, long approval, LocalDateTime regtime);

}
