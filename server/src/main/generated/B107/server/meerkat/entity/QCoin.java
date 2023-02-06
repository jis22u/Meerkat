package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCoin is a Querydsl query type for Coin
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCoin extends EntityPathBase<Coin> {

    private static final long serialVersionUID = 1248820788L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCoin coin1 = new QCoin("coin1");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final NumberPath<Integer> coin = createNumber("coin", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QCoin(String variable) {
        this(Coin.class, forVariable(variable), INITS);
    }

    public QCoin(Path<? extends Coin> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCoin(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCoin(PathMetadata metadata, PathInits inits) {
        this(Coin.class, metadata, inits);
    }

    public QCoin(Class<? extends Coin> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

