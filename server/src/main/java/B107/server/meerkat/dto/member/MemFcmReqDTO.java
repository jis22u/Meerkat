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
	private List<String> fcmTokenList;

	@Builder
	public MemFcmReqDTO(Long idx, String roomName, List<String> fcmTokenList) {
		this.idx = idx;
		this.roomName = roomName;
		this.fcmTokenList = fcmTokenList;
	}
}
