package B107.server.meerkat.dto.member;


import B107.server.meerkat.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SignModReqDTO {

	@Max(14)
	@Min(1)
	@NotNull(message = "회원 ID가 없습니다.", groups = signUp.class)
	private String memberId;

	@NotBlank(message = "비밀번호가 없습니다.", groups = signUp.class)
	private String password;

	@NotBlank(groups = modPw.class) //비밀번호 변경시 입니다.
	private String newPassword;
	@NotBlank(groups = modPw.class) //비밀번호 변경시 검증용입니다.
	private String originPassword;

	@NotBlank(message = "이름이 없습니다.", groups = {mod.class, signUp.class})
	private String name;

	@NotBlank(message = "이메일이 없습니다.", groups = {mod.class, signUp.class})
	@Email
	private String email;

	@NotBlank(message = "전화번호가 없습니다.", groups = {mod.class, signUp.class})
	private String tel;

	@Builder
	public SignModReqDTO(String memberId, String password, String originPassword, String name, String email, String tel) {
		this.memberId = memberId;
		this.password = password;
		this.originPassword = originPassword;
		this.name = name;
		this.email = email;
		this.tel = tel;
	}

	public Member of(String memberId, String password) {
		return Member.builder().memberId(memberId).password(password).name(name).email(email).tel(tel).build();
	}

	public String make(Member member) {
		return this.getMemberId();
	}
}
