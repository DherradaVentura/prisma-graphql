const { prisma } = require('./db')

const resolvers = {
    Query: {
        feed: (parent, args, context, info) => {
            return prisma.post.findMany(
                {
                    where: { published: true }
                })
        },
        post: (parent, args, context, info) => {
            return prisma.post.findUnique(
                {
                    where: { id: Number(args.id) }
                 })
        }
    },
    Mutation: {
        createDraft: (parent, args, context, info) => {
            return prisma.post.create({
                data: {
                    title: args.title,
                    content: args.content,
                    published: false,
                    author: args.authorEmail && {
                        connect: { email: args.authorEmail }
                    },
                }
            })
        },
        publish: (parent, args, context, info) => {
            return prisma.post.update({
                where: { id: Number(args.id) },
                data: {
                    published: true
                },
            })
        },
        createUser: (parent, args, context, info) => {
            return prisma.user.create({
                data: {
                    email: args.data.email,
                    name: args.data.name,
                    posts: {
                        create: args.data.posts
                    }
                }
            })
        }
    },
    User: {
        posts: (parent, args, context, info) => {
            return prisma.user.findUnique(
                {
                    where: { id: parent.id }
                })
                .posts()
        }
    },
    Post: {
        author: (parent, args, context, info) => {
            return prisma.post.findUnique(
                {
                    where: { id: parent.id }
                })
                .author()
        }
    }
}

module.exports = {
    resolvers
}