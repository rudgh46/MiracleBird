package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Landmark;

import java.util.List;

public interface LandmarkService {
    List<LandmarkDto> getLandmarkAll() throws Exception;
    List<LandmarkDto> getLandmarkAllByDongCode(Long dongCode) throws Exception;
    List<LandmarkDto> getLandmarkAllByUser(Long userIdx) throws Exception;
    LandmarkDto getLandmark(Long landmarkIdx) throws Exception;
    List<LandmarkDto> getLandmarkAllByLandmarkInfoIdx(Long landmarkInfoIdx) throws Exception;
    LandmarkDto createLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception;
    void updateLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception;
}