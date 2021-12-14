package com.sparta.week03.domain;

import com.sparta.week03.dto.MemoRequestDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor // 기본생성자를 만듭니다.
@Getter
@Entity // 테이블과 연계됨을 스프링에게 알려줍니다.
public class Memo extends Timestamped{ // 생성,수정 시간을 자동으로 만들어줍니다.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private Long userId;

    @OneToMany(mappedBy="memo")
    private List<Comments> comments;

    public Memo(String title, String contents, Long userId) {
        this.title = title;
        this.contents = contents;
        this.userId = userId;
    }

    public Memo(MemoRequestDto requestDto, Long userId) {
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
        this.userId = userId;
    }

    public void update(MemoRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }
}
