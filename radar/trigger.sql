CREATE OR REPLACE FUNCTION process_dist_calculation() RETURNS trigger AS $distance_alarm$
begin
if  sqrt(pow(CAST(NEW.path_info->>'x' AS FLOAT), 2) + pow(CAST(NEW.path_info->>'y' AS FLOAT), 2)) < 10 
--and sqrt(pow(CAST(NEW.path_info->>'x' AS FLOAT), 2) + pow(CAST(NEW.path_info->>'y' AS FLOAT), 2)) > 9.8
then RAISE NOTICE 'missile';
end if;
return new;
end;
$distance_alarm$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS distance_alarm ON trajectory_path;
CREATE TRIGGER distance_alarm
AFTER INSERT 
ON trajectory_path 
FOR EACH ROW
EXECUTE FUNCTION process_dist_calculation();

