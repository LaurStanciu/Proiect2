import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
//import com.mongodb.client.model.Filters;

import java.util.Date;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;


/**
 * Created by Laur Stanciu on 6/3/2017.
 */
public class AccountsService {
    private final MongoDatabase db;
    private final MongoCollection<Document> collection;

    public AccountsService(MongoDatabase db){
        this.db = db;
        this.collection = db.getCollection("accounts");
    }

    public Models.Message signUp(String body){
        Models models = new Models();

        Account account = new Gson().fromJson(body, Account.class);
        if(collection.count(eq("email", account.getEmail())) == 0)  {
            collection.insertOne(new Document("email", account.getEmail()).append("password", account.getPassword()).append("createdOn", new Date()));
        }
        else{
            return models.new Message(Models.MessageType.Failed, "");
        }
        return models.new Message(Models.MessageType.Successful, "");

    }

    public Models.Message signIn(String body){
        Models models = new Models();

        Account account = new Gson().fromJson(body, Account.class);
        if(collection.count((and(eq("email", account.getEmail()), eq("password", account.getPassword())))) == 1)  {
            return models.new Message(Models.MessageType.Successful, "");
        }
        else{
            return models.new Message(Models.MessageType.Failed, "");
        }
    }
}
