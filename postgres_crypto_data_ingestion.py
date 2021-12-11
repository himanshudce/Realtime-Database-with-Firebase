import time
import psycopg2
import json


def main():
    json_file_path= 'data/bitcoin_merged_data_sample.json'
    with open(json_file_path) as json_file:
        data = json.load(json_file)
    
    sql = """insert into crypto_tab(bitcoin_info) values(%s)""" 

    with psycopg2.connect(host='localhost', port=5432, database='bitcoindb', user='postgres',
                          password='himntommy') as conn:
        with conn.cursor() as cur:

            start_time = time.time()
            print(start_time)

            counter = 0
            for line in data:
                line = str(line)
                line = line.replace('\'','\"')
                cur.execute(sql, (line,))
                counter += 1
                if counter % 100 == 0:
                    conn.commit()
            conn.commit()

            end_time = time.time()
            print(end_time)

            print("time taken to load the data is {} seconds".format(end_time-start_time))

if __name__ == '__main__':
    main()
