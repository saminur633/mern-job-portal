const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.ak3ds.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    // POST: Add a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date(); // Add creation timestamp

      try {
        const result = await jobsCollections.insertOne(body);
        if (result.insertedId) {
          return res.status(201).send(result);
        } else {
          return res.status(400).send({
            message: "Cannot insert, try again later",
            status: false,
          });
        }
      } catch (error) {
        console.error("Error inserting job:", error);
        return res.status(500).send({
          message: "Internal Server Error",
          status: false,
        });
      }
    });

    // GET: Retrieve all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollections.find({}).toArray();
        if (jobs.length > 0) {
          res.status(200).send(jobs);
        } else {
          res.status(204).send();
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).send({
          message: "Internal Server Error",
          status: false,
        });
      }
    });
    // Get single job
   app.get("/all-jobs/:id", async (req, res) => {
    try {
    const id = req.params.id;
    const job = await jobsCollections.findOne({ _id: new ObjectId(id) });

     if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    res.send(job);
   } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
 });


    // GET: Retrieve jobs posted by a specific user
    app.get("/my-job/:email", async (req, res) => {
      const { email } = req.params;
      if (!email) {
        return res.status(400).send({
          message: "Email is required",
          status: false,
        });
      }
      try {
        const jobs = await jobsCollections.find({ postedBY: email }).toArray();
        if (jobs.length > 0) {
          res.status(200).send(jobs);
        } else {
          res.status(404).send({
            message: "No jobs found for this email",
            status: false,
          });
        }
      } catch (error) {
        console.error("Error fetching jobs by email:", error);
        res.status(500).send({
          message: "Internal Server Error",
          status: false,
        });
      }
    });
    // delete method
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const filter = { _id: new ObjectId(id) }; // Correct usage of ObjectId
        const result = await jobsCollections.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).send({ message: "Job deleted successfully!" });
        } else {
          res.status(404).send({ message: "Job not found!" });
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    // Update a job
app.patch("/update-job/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;

  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  const updateDoc = {
      $set: {
          ...jobData,
      },
  };

  const result = await jobsCollections.updateOne(filter, updateDoc, options);
  res.send(result);
});

    
    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello Developer!");
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
