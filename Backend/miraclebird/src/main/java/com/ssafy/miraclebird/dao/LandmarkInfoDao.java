package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Landmark_Info;

import java.util.List;

public interface LandmarkInfoDao {
    Landmark_Info getLandmarkInfo(Long landmarkInfoIdx) throws Exception;
}