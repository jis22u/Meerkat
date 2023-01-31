package B107.server.meerkat.controller;

import B107.server.meerkat.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

//    private static final String METHOD_NAME = MemberController.class.getName();

    @Autowired
    private final MemberService memberService;

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> user) {
        String token = memberService.findByMemberId(user);
        System.out.println(token);
        return token;
    }


}
