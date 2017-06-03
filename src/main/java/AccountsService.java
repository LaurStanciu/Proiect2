import com.google.gson.Gson;
import com.mongodb.*;

import java.util.Date;

/**
 * Created by Laur Stanciu on 6/3/2017.
 */
public class AccountsService {
    private final DB db;
    private final DBCollection collection;

    public AccountsService(DB db){
        this.db = db;
        this.collection = db.getCollection("onlineShop");
    }

    public void signUp(String body){
        Account account = new Gson().fromJson(body, Account.class);
        collection.insert(new BasicDBObject("email", account.getEmail()).append("password", account.getPassword()).append("createdOn", new Date()));
    }

    public boolean signIn(String body){
        Account account = new Gson().fromJson(body, Account.class);

        return true;
    }
}
