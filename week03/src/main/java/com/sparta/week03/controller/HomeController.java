package com.sparta.week03.controller;

import com.sparta.week03.security.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    //스피링 시큐리티가 로그인된 사용자의 정보를 넘겨주게 됨, 타임리프와 관련된 부분
    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        model.addAttribute("username", userDetails.getUsername());
        return "index";
    }
}