package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.Context;
import android.os.Bundle;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    ListView dialogList;
    int count = 3;
    String[] issuerName = {"Шерлок", "Хадсон", "Майкрософт"};
    String[] issuerMessage = {"Не ходи на лабы", "Ходи на лабы", "Не знаю, наверно все таки не ходи на лабы"};
    int[] imgResIds = {R.drawable.sherlock, R.drawable.hudson, R.drawable.microsoft};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dialogList = findViewById(R.id.dialogList);
        MyAdapter adapter = new MyAdapter(this, issuerName, issuerMessage, imgResIds);
        dialogList.setAdapter(adapter);
    }

    class MyAdapter extends ArrayAdapter<String> {
        Context context;
        String rIssuer[];
        String rMessage[];
        int rImgId[];

        MyAdapter(Context c, String issuer[], String message[], int img[]) {
            super(c, R.layout.dialog_list_item, R.id.issuerName, issuer);
            this.context = c;
            this.rIssuer = issuer;
            this.rMessage = message;
            this.rImgId = img;
        }

        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater) getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);

            View row = layoutInflater.inflate(R.layout.dialog_list_item, parent, false);
            ImageView img = row.findViewById(R.id.issuerPic);
            TextView issuer = row.findViewById(R.id.issuerName);
            TextView message = row.findViewById(R.id.issuerMessage);

            row.setBackgroundColor(0xFF0000FF + 1000000*position);

            img.setImageResource(rImgId[position]);
            issuer.setText(rIssuer[position]);
            message.setText(rMessage[position]);

            return row;

        }
    }
}