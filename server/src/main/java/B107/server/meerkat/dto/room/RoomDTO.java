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

	@Builder
	public RoomDTO(Long idx, String roomName) {
		this.idx = idx;
		this.roomName = roomName;
	}
}
