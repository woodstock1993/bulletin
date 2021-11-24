package com.sparta.week03.service;

import com.sparta.week03.domain.Memo;
import com.sparta.week03.domain.MemoRepository;
import com.sparta.week03.domain.MemoRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor // final 있는 부분 있으면 자동으로 넣어줄게
@Service
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional //해당 내용 update 할 때 db한테 알려줘야 돼
    public Long update(Long id, MemoRequestDto requestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()->new NullPointerException("아이디가 없습니다.")
        );
        memo.update(requestDto);
        return id;
    }
}
