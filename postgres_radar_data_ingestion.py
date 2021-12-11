import time
import psycopg2


def main():
    data_file_path= 'data/trajectory_data_sample.txt'
    with open(json_file_path) as json_file:
        data = json.load(json_file)
    
    sql = """insert into trajectory_path(path_info) values(%s)""" 

    with psycopg2.connect(host='localhost', port=5432, database='trajectorydb', user='postgres',
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
