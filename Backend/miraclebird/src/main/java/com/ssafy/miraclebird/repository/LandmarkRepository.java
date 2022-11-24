package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandmarkRepository extends JpaRepository<Landmark,Long>{
    List<Landmark> findAllByLandmarkInfo_DongCode(Long dongCode);
    List<Landmark> findAllByUser_UserIdx(Long userIdx);
    List<Landmark> findAllByLandmarkInfo_LandmarkInfoIdx(Long landmarkInfoIdx);
    Landmark getByStarForceAndLandmarkInfo_LandmarkInfoIdx(Long starForce, Long landmarkInfoIdx);
}
