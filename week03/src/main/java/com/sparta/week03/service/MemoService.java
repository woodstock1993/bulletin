package com.sparta.week03.service;

import com.sparta.week03.domain.Comments;
import com.sparta.week03.domain.Memo;
import com.sparta.week03.repository.MemoRepository;
import com.sparta.week03.dto.MemoRequestDto;
import com.sparta.week03.dto.CommentsRequestDto;
import com.sparta.week03.repository.CommentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor // final 있는 부분 있으면 자동으로 넣어줄게
@Service
public class MemoService {

    private final MemoRepository memoRepository; //MemoService 객체가 메모리 올라갈 때 해당 객체의 형태는 고정이야
    private final CommentsRepository commentRepository;

    @Transactional //해당 내용 update 할 때 db한테 알려줘야 돼
    public Long update(Long id, MemoRequestDto requestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()->new NullPointerException("아이디가 없습니다.")
        );
        memo.update(requestDto);
        return id;
    }
    @Transactional
    public void setMemoComment(CommentsRequestDto requestDto){
        Memo memo = memoRepository.findById(requestDto.getId()).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        Comments comment = new Comments(requestDto, memo);
        commentRepository.save(comment);
    }

    public Memo getMemos(Long id) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다."));
        return memo;
    }
}
