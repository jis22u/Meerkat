package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCoin is a Querydsl query type for Coin
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCoin extends EntityPathBase<Coin> {

    private static final long serialVersionUID = 1248820788L;

    public static final QCoin coin1 = new QCoin("coin1");

    public final NumberPath<Integer> coin = createNumber("coin", Integer.class);

    public final StringPath memberId = createString("memberId");

    public QCoin(String variable) {
        super(Coin.class, forVariable(variable));
    }

    public QCoin(Path<? extends Coin> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCoin(PathMetadata metadata) {
        super(Coin.class, metadata);
    }

}

