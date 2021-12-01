package com.sparta.week03.controller;

import com.sparta.week03.domain.Comments;
import com.sparta.week03.domain.Memo;
import com.sparta.week03.dto.CommentsRequestDto;
import com.sparta.week03.repository.CommentsRepository;
import com.sparta.week03.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemoCommentsController {

    private final MemoRepository memoRepository;
    private final CommentsRepository commentsRepository;

    @GetMapping("/api/comments/{id}")
    public List<Comments> pictureComments(@PathVariable Long id) {
        System.out.println("메모"+id+"입니다");
        return commentsRepository.findByMemoId(id);
    }

    @PostMapping("/api/comments/{id}")
    public Comments createComments(@PathVariable Long id, @RequestBody CommentsRequestDto commentsRequestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()-> new NullPointerException("메모에 해당하는 아이디가 없습니다."));
        Comments comments = new Comments(commentsRequestDto, memo);
        return commentsRepository.save(comments);
    }
}
