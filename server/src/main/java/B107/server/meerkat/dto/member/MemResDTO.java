package B107.server.meerkat.dto.member;

import B107.server.meerkat.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemResDTO {
	private Long memberId;
	private String name;
	private String email;
	private String tel;

	@Builder
	public MemResDTO(Long memberId, String name, String email, String tel) {
		this.memberId = memberId;
		this.name = name;
		this.email = email;
		this.tel = tel;
	}

	public MemResDTO of(Member member) {
		return MemResDTO.builder().memberId(member.getIdx()).name(member.getName()).email(member.getEmail()).tel(member.getTel()).build();
	}
}
