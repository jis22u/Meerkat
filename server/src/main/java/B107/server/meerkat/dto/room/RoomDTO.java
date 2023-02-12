package B107.server.meerkat.dto.room;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RoomDTO {
	private Long idx;
	private String roomName;
//	private Boolean isValid;
//	private Long request_idx;
//	private Long response_idx;

	@Builder
	public RoomDTO(Long idx, String roomName) {
		this.idx = idx;
		this.roomName = roomName;
//		this.isValid = isValid;
//		this.request_idx = request_idx;
//		this.response_idx = response_idx;
	}
}
