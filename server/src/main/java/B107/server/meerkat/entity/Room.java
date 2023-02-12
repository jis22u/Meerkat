package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "room")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idx;

	@Column(name = "room_name")
	private String roomName; // 대화방 id

	@Column(name = "is_valid")
	@Convert(converter = BooleanToYNConverter.class)
	private Boolean isValid;

	// 요청자
	@Column(name = "request_idx")
	private Long requestIdx;

	// 미어캣
	@Column(name = "response_idx")
	private Long responseIdx;
}
