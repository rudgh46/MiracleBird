package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.service.LandmarkService;
import com.ssafy.miraclebird.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/landmark")
@Api("NFT랜드마크 관련 REST V1")
public class LandmarkController {

    private final LandmarkService landmarkService;

    @Autowired
    public LandmarkController(LandmarkService landmarkService) {
        this.landmarkService = landmarkService;
    }

    @ApiOperation(value = "전체 NFT랜드마크 정보를 반환한다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<LandmarkDto>> getLandmarkAll() {
        List<LandmarkDto> result = null;

        try {
            result = landmarkService.getLandmarkAll();
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "새로운 랜드마크를 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<LandmarkDto> createLandmark(@RequestBody LandmarkDto landmarkDto, @RequestParam("user_idx") Long userIdx) {
        LandmarkDto result = null;

        try {
            result = landmarkService.createLandmark(landmarkDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "해당 구역에 존재하는 NFT랜드마크 정보를 반환한다.", response = List.class)
    @GetMapping("/dongcode/{dong_code}")
    public ResponseEntity<List<LandmarkDto>> getLandmarkAllByDongCode(@PathVariable("dong_code") Long dongCode) {
        List<LandmarkDto> result = null;

        try {
            result = landmarkService.getLandmarkAllByDongCode(dongCode);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_idx가 소유한 전체 NFT랜드마크 정보를 반환한다.", response = List.class)
    @GetMapping("/user/{user_idx}")
    public ResponseEntity<List<LandmarkDto>> getLandmarkAllByUser(@PathVariable("user_idx") Long userIdx) {
        List<LandmarkDto> result = null;

        try {
            result = landmarkService.getLandmarkAllByUser(userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "landmark_idx에 해당하는 NFT랜드마크 정보를 반환한다.", response = LandmarkDto.class)
    @GetMapping("/{landmark_idx}")
    public ResponseEntity<LandmarkDto> getLandmark(@PathVariable("landmark_idx") Long landmarkIdx) {
        LandmarkDto result = null;

        try {
            result = landmarkService.getLandmark(landmarkIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "landmark_info_idx에 해당하는 NFT랜드마크 정보를 반환한다.", response = LandmarkDto.class)
    @GetMapping("/landmarkinfoidx/{landmark_info_idx}")
    public ResponseEntity getLandmarkByInfo(@PathVariable("landmark_info_idx") Long landmarkInfoIdx) {
        List<LandmarkDto> result = null;
        try {
            result = landmarkService.getLandmarkAllByLandmarkInfoIdx(landmarkInfoIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "landmark_idx에 해당하는 NFT랜드마크 정보(판매/구매하는 경우)를 수정한다.", response = String.class)
    @PutMapping("/{landmark_idx}")
    public ResponseEntity<String> updateLandmark(@PathVariable("landmark_idx") Long landmarkIdx, @RequestBody LandmarkDto landmarkDto, @RequestParam("user_idx") Long userIdx) {
        try {
            landmarkDto.setLandmarkIdx(landmarkIdx);
            landmarkService.updateLandmark(landmarkDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }
}
