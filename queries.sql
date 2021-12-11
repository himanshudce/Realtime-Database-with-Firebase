-- 1. count no of rows
select count(*) from crypto_tab;

-- 2. order by and date descending and get last 100 rows 
select * from crypto_tab
order by bitcoin_info->>'Date' DESC limit 100;


--3 bit coin at specific date and time
select * from crypto_tab
where bitcoin_info->>'Date' = '2018-12-07 21:52:00';



--4 bit coin greater and less
select * from crypto_tab
where (bitcoin_info->>'High')::float > 3800 and (bitcoin_info->>'High')::float < 4500;


-- 5. all coins where volumne is greater than 2
select * from crypto_tab
where (bitcoin_info->>'Volume')::float > 2;





--5. bit coin at specific date and time
--select * from crypto_tab
--where bitcoin_info->>'Date' = '2018-12-07 21:52:00';

--6.
--select * from crypto_tab
--where (bitcoin_info->>'High')::float > 3800 and  bitcoin_info->>'Symbol' = 'BTCUSD';






