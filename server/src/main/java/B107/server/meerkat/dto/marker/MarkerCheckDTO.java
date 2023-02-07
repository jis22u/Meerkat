package B107.server.meerkat.dto.marker;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MarkerCheckDTO {
	private String memberId;
	private boolean mc_check;
}
