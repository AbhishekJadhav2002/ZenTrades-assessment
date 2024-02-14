import { UserJobs } from '@/types/api.types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { markers } = await req.json();

        let sql = "INSERT INTO jobs (address, lat, long, status, user) VALUES ";
        for await (const mark of markers) {
            sql += `('${mark.address}', ${mark.lat}, ${mark.long}, 'false', ${1}),`;
        }
        sql = sql[sql.length - 1] === ',' ? sql.slice(0, -1) : sql;
        sql += ';';

        const base64Sql = Buffer.from(sql).toString('base64');
        const dbHubBody = new FormData();
        dbHubBody.append('apikey', process.env.DBHUB_API_KEY as string);
        dbHubBody.append('dbowner', process.env.DBHUB_OWNER as string);
        dbHubBody.append('dbname', process.env.DBHUB_DBNAME as string);
        dbHubBody.append('sql', base64Sql);
        const jobInsertRes = await fetch(`https://api.dbhub.io/v1/execute`, {
            method: 'POST',
            body: dbHubBody
        });

        const jobInserts = await jobInsertRes.json();
        if (!jobInsertRes.ok) {
            console.error(jobInserts);
            throw new Error('Failed to insert data into database');
        }

        if (jobInserts.status !== "OK") {
            console.error(jobInserts);
            throw new Error('Failed to insert data into database');
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization') as any;

        const sql = `SELECT * FROM jobs WHERE user='${token}' AND status='false' ORDER BY id DESC;`;
        const base64Sql = Buffer.from(sql).toString('base64');
        const dbHubBody = new FormData();
        dbHubBody.append('apikey', process.env.DBHUB_API_KEY as string);
        dbHubBody.append('dbowner', process.env.DBHUB_OWNER as string);
        dbHubBody.append('dbname', process.env.DBHUB_DBNAME as string);
        dbHubBody.append('sql', base64Sql);
        const userJobsRes = await fetch(`https://api.dbhub.io/v1/query`, {
            method: 'POST',
            body: dbHubBody
        });

        const userJobs = await userJobsRes.json();
        if (!userJobsRes.ok) {
            console.error(userJobs);
            throw new Error('Failed to fetch data from database');
        }

        let jobs: UserJobs[] = [];
        if (!userJobs) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        userJobs.forEach((job: any) => {
            jobs.push({
                address: job[1].Value,
                position: {
                    lat: parseFloat(job[2].Value),
                    lng: parseFloat(job[3].Value)
                }
            });
        });

        return NextResponse.json({ success: true, data: jobs }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}