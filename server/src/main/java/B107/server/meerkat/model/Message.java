package B107.server.meerkat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Message {

	// 여기다가  offer인지 answer인지 구분해주는 걸 담을거야
	@Enumerated(EnumType.STRING)
	private MessageType messageType;
	private String sdp;
	private String roomName;
}
