var express = require('express');
var router = express.Router();

var Employee = require("../models/employee");
var Issue = require("../models/issue");

// TODO: should implement range pagination instead of using skip to result in better server performance
router.get('/issues', (req, res) => {
  
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    if (req.query.search) filter.$text = { $search: req.query.search };

    if (req.query._summary === undefined) {
        const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
        let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;

        console.log('offset', offset);
        console.log('limit', limit);

        if (limit > 50) limit = 50;
        const cursor = db.collection('issues').find(filter).sort({ created: -1 }).skip(offset).limit(limit);

        let totalCount;
        // ensures that the effects of skip() and limit() will be ignored
        cursor.count(false).then(result => {
            totalCount = result;
            return cursor.toArray();
        }).then(issues => {
            res.json({ metadata: { totalCount }, records: issues });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
    } else {
        console.log('doing aggregation', filter);
        Issue.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { owner: '$owner', status: '$status' }, count: {
                        $sum: 1
                    }
                }
            },
        ]).exec().then(results => {
                const stats = {};
                results.forEach(result => {
                    if (!stats[result._id.owner]) stats[result._id.owner] = {};
                    stats[result._id.owner][result._id.status] = result.count;
                });
                res.json(stats);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: `Internal Server Error: ${error}` });
            });
    }
});
// router.post('/issues', (req, res) => {
//     const newIssue = req.body;
//     newIssue.created = new Date();
//     if (!newIssue.status) {
//         newIssue.status = 'New';
//     }

//     const err = IssueHelper.validateIssue(newIssue);
//     if (err) {
//         res.status(422).json({ message: `Invalid request: ${err}` });
//         return;
//     }

//     db.collection('issues').insertOne(IssueHelper.cleanupIssue(newIssue)).then(result =>
//         db.collection('issues').find({ _id: result.insertedId }).limit(1)
//         .next()
//     )
//     .then(savedIssue => {
//         res.json(savedIssue);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: `Internal Server Error: ${error}` });
//     });
// });
// router.get('/issues/:id', (req, res) => {
//     let issueId;
//     try {
//         issueId = new ObjectId(req.params.id);
//     } catch (error) {
//         res.status(422).json({ message: `Invalid issue ID format: ${error}` });
//         return;
//     }
//     db.collection('issues').find({ _id: issueId }).limit(1)
//         .next()
//         .then(issue => {
//             if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
//             else res.json(issue);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ message: `Internal Server Error: ${error}` });
//         });
// });
// // Add routes for handling PATCH request
// router.put('/issues/:id', (req, res) => {
//     let issueId;
//     try {
//         issueId = new ObjectId(req.params.id);
//     } catch (error) {
//         res.status(422).json({ message: `Invalid issue ID format: ${error}` });
//         return;
//     }
//     const issue = req.body;

//     // MongoDB update operation treats the ID specially, and leaves it
//     // intact even if not present in the document that replaces the existing document.
//     delete issue._id;

//     const err = IssueHelper.validateIssue(issue);
//     if (err) {
//         res.status(422).json({ message: `Invalid request: ${err}` });
//         return;
//     }
//     db.collection('issues').update({ _id: issueId },
//         IssueHelper.convertIssue(issue)).then(() =>
//             db.collection('issues').find({ _id: issueId }).limit(1).next()
//         ).then(savedIssue => {
//             res.json(savedIssue);
//         }).catch(error => {
//             console.log(error);
//             res.status(500).json({ message: `Internal Server Error: ${error}` });
//         });
// });

// // Server delete method
// router.delete('/issues/:id', (req, res) => {
//     let issueId;
//     try {
//         issueId = new ObjectId(req.params.id);
//     } catch (error) {
//         res.status(422).json({ message: `Invalid issue ID format: ${error}` });
//         return;
//     }
//     db.collection('issues').deleteOne({ _id: issueId }).then((deleteResult) => {
//         if (deleteResult.result.n === 1) res.json({ status: 'OK' });
//         else res.json({ status: 'Warning: object not found' });
//     }).catch(error => {
//         console.log(error);
//         res.status(500).json({ message: `Internal Server Error: ${error}` });
//     });
// });

// // For bulk delete
// router.delete('/issues/', (req, res) => {

//     let issueIds = req.body.issueIds

//     try {
//         issueIds = issueIds.map(id => new ObjectId(id));

//         // for(let i = 0; i < issueIds.length; i++) {
//         //     issueIds[i] =  new ObjectId( issueIds[i] );
//         // }
//     } catch (error) {
//         res.status(422).json({
//             message: `Invalid issue ID format: ${error}`
//         });
//         return;
//     }
  
//     db.collection('issues').deleteMany({ _id: {'$in':issueIds} }).then((deleteResult) => {
//         if (deleteResult.result.n === issueIds.length) res.json({ status: 'OK' });
//         else res.json({ status: 'Warning: object not found' });
//     }).catch(error => {
//         console.log(error);
//         res.status(500).json({ message: `Internal Server Error: ${error}` });
//     });
// });

module.exports = router;
