package B107.server.meerkat.config.security;

import B107.server.meerkat.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
public class MemberDTO {
	private Long idx;
	private String memberId;
	private String password;
	private String name;
	private String email;
	private String tel;
	private String role;
	private Integer warn; // 사용자가 신고받은 횟수
	//    @Convert(converter = BooleanToYNConverter.class)
	private Boolean ban; // 사용자 제재 여부

	@Column(name = "fcm_token")
	private String fcmToken; // fcm 알림을 받을 token

	@Builder
	public MemberDTO(Long idx, String memberId, String password, String name, String email, String tel, String role, Integer warn, Boolean ban, String fcmToken) {
		this.idx = idx;
		this.memberId = memberId;
		this.password = password;
		this.name = name;
		this.email = email;
		this.tel = tel;
		this.role = role;
		this.warn = warn;
		this.ban = ban;
		this.fcmToken = fcmToken;
	}

	public MemberDTO of(Member member) {
		return MemberDTO.builder()
				.idx(member.getIdx())
				.memberId(member.getMemberId())
				.password(member.getPassword())
				.name(member.getName())
				.email(member.getEmail())
				.tel(member.getTel())
				.role(member.getRole())
				.warn(member.getWarn())
				.ban(member.getBan())
				.fcmToken(member.getFcmToken())
				.build();
	}
}
