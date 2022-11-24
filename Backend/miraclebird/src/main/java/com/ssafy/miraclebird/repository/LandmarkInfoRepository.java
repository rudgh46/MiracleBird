package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Landmark_Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandmarkInfoRepository extends JpaRepository<Landmark_Info,Long>{

}
