package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Landmark_Info;
import com.ssafy.miraclebird.repository.LandmarkInfoRepository;
import com.ssafy.miraclebird.repository.LandmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LandmarkInfoDaoImpl implements LandmarkInfoDao {

    private final LandmarkInfoRepository landmarkInfoRepository;

    @Autowired
    public LandmarkInfoDaoImpl(LandmarkInfoRepository landmarkInfoRepository) {
        this.landmarkInfoRepository = landmarkInfoRepository;
    }

    @Override
    public Landmark_Info getLandmarkInfo(Long landmarkInfoIdx) throws Exception {
        Landmark_Info landmarkEntity = landmarkInfoRepository.getById(landmarkInfoIdx);

        if(landmarkEntity == null) {
            System.out.println("있는데 뭐야??????????????");
            throw new Exception();}

        return landmarkEntity;
    }
}
