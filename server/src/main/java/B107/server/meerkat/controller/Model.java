package B107.server.meerkat.controller;

import B107.server.meerkat.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
class Model {
    private String memberId, password, name, email, tel;

    public Member toEntity(String pw) {
        return Member.builder()
                .memberId(memberId)
                .password(pw)
                .name(name)
                .email(email)
                .tel(tel)
                .build();
    }
}