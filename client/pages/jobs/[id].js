import Layout from "../../components/layout/Layout";
import NotFound from "../../components/layout/NotFound";
import JobDetails from "../../components/job/JobDetails";

import axios from "axios";

export default function JobDetailsPage({ job, candidates, error }) {
  if (error?.includes("Not found")) return <NotFound />;

  return (
    <Layout title={job.title}>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/jobs/${params.id}/`
    );

    console.log(res.data);
    const job = JSON.stringify(res.data.job);
    const candidates = JSON.stringify(res.data.candidates);

    return {
      props: {
        job,
        candidates,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}
