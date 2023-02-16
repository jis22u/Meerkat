package B107.server.meerkat.dto.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemFcmReqDTO {

	private Long idx;
	private String roomName;
	private String content;
	private String name;
	private List<String> fcmTokenList;

	@Builder
	public MemFcmReqDTO(Long idx, String roomName, String content, String name, List<String> fcmTokenList) {
		this.idx = idx;
		this.roomName = roomName;
		this.content = content;
		this.name = name;
		this.fcmTokenList = fcmTokenList;
	}
}
