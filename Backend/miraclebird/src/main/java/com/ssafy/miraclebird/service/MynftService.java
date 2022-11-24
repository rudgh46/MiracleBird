package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.MynftDto;

import java.util.List;

public interface MynftService {
    List<MynftDto> getMynft(Long userIdx) throws Exception;
    void createMynft(MynftDto mynftDto, Long userIdx) throws Exception;
    void deleteMynft(Long mynftIdx, Long userIdx) throws Exception;
    void updateMynft(Long landmarkIdx, Long userIdx) throws Exception;
}