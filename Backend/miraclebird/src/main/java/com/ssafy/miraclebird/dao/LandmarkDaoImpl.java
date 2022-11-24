package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.repository.LandmarkRepository;
import com.ssafy.miraclebird.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LandmarkDaoImpl implements LandmarkDao {

    private final LandmarkRepository landmarkRepository;

    @Autowired
    public LandmarkDaoImpl(LandmarkRepository landmarkRepository) {
        this.landmarkRepository = landmarkRepository;
    }

    @Override
    public List<Landmark> getLandmarkAll() throws Exception {
        List<Landmark> landmarkList = landmarkRepository.findAll();

        return landmarkList;
    }

    @Override
    public List<Landmark> getLandmarkAllByDongCode(Long dongCode) throws Exception {
        List<Landmark> landmarkList = landmarkRepository.findAllByLandmarkInfo_DongCode(dongCode);

        return landmarkList;
    }

    @Override
    public List<Landmark> getLandmarkAllByUser(Long userIdx) {
        List<Landmark> landmarkList = landmarkRepository.findAllByUser_UserIdx(userIdx);

        return landmarkList;
    }

    @Override
    public List<Landmark> getLandmarkAllByLandmarkInfoIdx(Long landmarkInfoIdx) throws Exception {
        List<Landmark> landmarkList = landmarkRepository.findAllByLandmarkInfo_LandmarkInfoIdx(landmarkInfoIdx);

        return landmarkList;
    }

    @Override
    public Landmark getLandmark(Long landmarkIdx) throws Exception {
        Landmark landmarkEntity = landmarkRepository.getById(landmarkIdx);

        if(landmarkEntity == null) {
            System.out.println("있는데 뭐야??????????????");
            throw new Exception();}

        return landmarkEntity;
    }

    @Override
    public Landmark getLandmark(Long starForce, Long landmarkInfoIdx) throws Exception {
        Landmark landmarkEntity = landmarkRepository.getByStarForceAndLandmarkInfo_LandmarkInfoIdx(starForce, landmarkInfoIdx);

        if(landmarkEntity == null) {
            System.out.println("있는데 뭐야??????????????");
            throw new Exception();}

        return landmarkEntity;
    }

    @Override
    public Landmark saveLandmark(Landmark landmark) throws Exception {
        try {
            landmarkRepository.save(landmark);
        }
        catch (Exception e) {
            throw new Exception();
        }

        return landmark;
    }
}
