package B107.server.meerkat.dto.member;

import B107.server.meerkat.entity.Call;
import B107.server.meerkat.entity.Coin;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemPageResDTO {
    private Integer coin;
    private MemPageDealDTO memPageDealDTO;

    @Builder
    public MemPageResDTO(Integer coin, MemPageDealDTO memPageDealDTO) {
        this.coin = coin;
        this.memPageDealDTO = memPageDealDTO;
    }

    public MemPageResDTO of(Coin coin, MemPageDealDTO memPageDealDTO) {
        return MemPageResDTO.builder().coin(coin.getCoin()).memPageDealDTO(memPageDealDTO).build();
    }
}
