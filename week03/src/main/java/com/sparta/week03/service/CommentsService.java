package com.sparta.week03.service;

import com.sparta.week03.controller.CommentsController;
import com.sparta.week03.domain.Comments;
import com.sparta.week03.dto.CommentsRequestDto;
import com.sparta.week03.repository.CommentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;

    @Transactional
    public void commentsUpdate(Long id, CommentsRequestDto commentsRequestDto) {
        System.out.println("commentsId: "+id);
        Comments comments = commentsRepository.findById(id).orElseThrow(
                () -> new NullPointerException("아이디가 없습니다")
        );
        comments.update(commentsRequestDto);
    }
}
