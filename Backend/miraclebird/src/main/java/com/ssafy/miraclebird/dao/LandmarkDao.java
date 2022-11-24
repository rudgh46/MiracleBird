package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface LandmarkDao {
    List<Landmark> getLandmarkAll() throws Exception;
    List<Landmark> getLandmarkAllByDongCode(Long dongCode) throws Exception;
    List<Landmark> getLandmarkAllByUser(Long userIdx) throws Exception;
    List<Landmark> getLandmarkAllByLandmarkInfoIdx(Long landmarkInfoIdx) throws Exception;
    Landmark getLandmark(Long landmarkIdx) throws Exception;
    Landmark getLandmark(Long starForce, Long landmarkInfoIdx) throws Exception;
    Landmark saveLandmark(Landmark landmark) throws Exception;
}