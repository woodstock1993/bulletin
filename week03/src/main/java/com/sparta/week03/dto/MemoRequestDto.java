package com.sparta.week03.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
public class MemoRequestDto {
    private String title;
    private String contents;
    private String userId;
}
