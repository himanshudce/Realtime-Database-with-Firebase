import requests
import json
import time
import multiprocessing

# Postgres
def load_data_postgres(data):
    start = time.time()
    for line in data:
        response_insert = requests.post('http://localhost:3000/postgres/write/crypto',json=line).text
    end = time.time()
    print("postgres",end-start)


def time_measurement(num):
    for i in range(4):
        time.sleep(0.5)
        response_write = int(requests.get('http://localhost:3000/postgres/read/crypto').text)
        print(response_write)




if __name__ == "__main__":
    # BITCOIN DATA
    json_file_path= './data/bitcoin_data_sample.json'
    with open(json_file_path) as json_file:
        bitcoin_data = json.load(json_file)


    p4 = multiprocessing.Process(target=time_measurement, args=(len(bitcoin_data), ))
    p1 = multiprocessing.Process(target=load_data_postgres, args=(bitcoin_data, ))
    p2 = multiprocessing.Process(target=load_data_postgres, args=(bitcoin_data, ))
    p3 = multiprocessing.Process(target=load_data_postgres, args=(bitcoin_data, ))

    # starting process 4
    p4.start()
    # starting process 1
    p1.start()
    # starting process 2
    p2.start()
    # starting process 3
    p3.start()
  
    # wait until process 4 is finished
    p4.join()
    # wait until process 1 is finished
    p1.join()
    # wait until process 2 is finished
    p2.join()
    # wait until process 3 is finished
    p3.join()
