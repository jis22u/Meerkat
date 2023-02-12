package B107.server.meerkat.dto.member;

import B107.server.meerkat.entity.Call;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemPageDealDTO {
    private String location;
    private Integer coin;

    @Builder
    public MemPageDealDTO(String location, Integer coin) {
        this.location = location;
        this.coin = coin;
    }

    public MemPageDealDTO of(Call call) {
        return MemPageDealDTO.builder().location(location).coin(coin).build();
    }
}