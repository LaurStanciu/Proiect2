/**
 * Created by Laur Stanciu on 6/4/2017.
 */
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.*;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * Created by pgv on 04.06.2017.
 */
public class GoodsService {

    private final MongoDatabase db;
    private final MongoCollection<Document> collection;

    public GoodsService(MongoDatabase db){
        this.db = db;
        this.collection = db.getCollection("goods");
    }

    public List<DBObject> findAll(){////tipul de date pe care il returnez ziceai ceva de un json.
        List<DBObject> goods = new ArrayList<>();
        MongoCursor dbObjects = (MongoCursor) collection.find();
        while(dbObjects.hasNext()){
            DBObject dbObject = (BasicDBObject) dbObjects.next();
            goods.add(dbObject);
        }
        return goods;
    }


    //// findOne(string, parametru)///ce returneaza daca sunt mai multe cu acelasi parametru?
}
